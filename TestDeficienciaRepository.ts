// _tests_/repositories/DeficienciaRepository.test.ts
import { DeficienciaRepository } from "../../src/repositories/DeficienciaRepository";
import { pool } from "../../src/config/db";
import { Deficiencia } from "../../src/models/Deficiencia";

// Mock do módulo de banco de dados
jest.mock("../../src/config/db.ts", () => ({
  pool: {
    query: jest.fn()
  }
}));

describe("DeficienciaRepository", () => {
  // Limpa os mocks entre cada teste
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("getAll", () => {
    it("deve retornar todas as deficiências", async () => {
      // Arrange
      const mockDeficiencias = [
        { id: 1, nome: "Deficiência Visual" },
        { id: 2, nome: "Deficiência Auditiva" }
      ];
      (pool.query as jest.Mock).mockResolvedValueOnce([mockDeficiencias]);

      // Act
      const result = await DeficienciaRepository.getAll();

      // Assert
      expect(pool.query).toHaveBeenCalledWith("SELECT * FROM deficiencia");
      expect(result).toEqual(mockDeficiencias);
    });
  });

  describe("getByName", () => {
    it("deve retornar uma deficiência quando encontrada pelo id", async () => {
      // Arrange
      const mockDeficiencia = { id: 1, nome: "Deficiência Visual" };
      (pool.query as jest.Mock).mockResolvedValueOnce([[mockDeficiencia]]);

      // Act
      const result = await DeficienciaRepository.getByName("Deficiência Visual");

      // Assert
      expect(pool.query).toHaveBeenCalledWith("SELECT * FROM deficiencia WHERE nome = ?", ["Deficiência Visual"]);
      expect(result).toEqual(mockDeficiencia);
    });

    it("deve retornar null quando deficiência não for encontrada", async () => {
      // Arrange
      (pool.query as jest.Mock).mockResolvedValueOnce([[]]);

      // Act
      const result = await DeficienciaRepository.getByName("Deficiência Visual");

      // Assert
      expect(pool.query).toHaveBeenCalledWith("SELECT * FROM deficiencia WHERE nome = ?", ["Deficiência Visual"]);
      expect(result).toBeNull();
    });
  });

  describe("create", () => {
    it("deve criar uma nova deficiência e retornar com ID", async () => {
        // Arrange
        const nomeDeficiencia = "Deficiência Motora"; // Passando uma string
        const mockResultado = { insertId: 3 };
        (pool.query as jest.Mock).mockResolvedValueOnce([mockResultado]);

        // Act
        const result = await DeficienciaRepository.create(nomeDeficiencia);

        // Assert
        expect(pool.query).toHaveBeenCalledWith(
            "INSERT INTO deficiencia (nome) VALUES (?)",
            [nomeDeficiencia]
        );
        expect(result).toEqual({ id: 3, nome: nomeDeficiencia }); // Verifica o resultado
    });
});

  describe("delete", () => {
    it("deve deletar uma deficiência existente e retornar true", async () => {
      // Arrange
      const mockResultado = { affectedRows: 1 };
      (pool.query as jest.Mock).mockResolvedValueOnce([mockResultado]);

      // Act
      const result = await DeficienciaRepository.delete("Deficiência Visual");

      // Assert
      expect(pool.query).toHaveBeenCalledWith("DELETE FROM deficiencia WHERE nome = ?", ["Deficiência Visual"]);
      expect(result).toBe(true);
    });

    it("deve retornar false quando deficiência não existe", async () => {
      // Arrange
      const mockResultado = { affectedRows: 0 };
      (pool.query as jest.Mock).mockResolvedValueOnce([mockResultado]);

      // Act
      const result = await DeficienciaRepository.delete("Defiencia Fisica");

      // Assert
      expect(pool.query).toHaveBeenCalledWith("DELETE FROM deficiencia WHERE nome = ?", ["Defiencia Fisica"]);
      expect(result).toBe(false);
    });
  });
});