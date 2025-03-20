// _tests_/controllers/DeficienciaController.test.ts
import { Request, Response } from "express";
import { DeficienciaController } from "../../src/controllers/DeficienciaController";
import { DeficienciaServices } from "../../src/services/DeficienciaServices";

// Mock do serviço
jest.mock("../../src/services/DeficienciaServices");

describe("DeficienciaController", () => {
  // Objetos para simular o request e response
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  
  // Reset dos mocks e objetos antes de cada teste
  beforeEach(() => {
    jest.clearAllMocks();
    
    mockResponse = {
      json: jest.fn().mockReturnThis(),
      status: jest.fn().mockReturnThis()
    };
  });

  describe("listar", () => {
    it("deve retornar todas as deficiências com status 200", async () => {
      // Arrange
      mockRequest = {};
      const mockDeficiencias = [
        { id: 1, nome: "Deficiência Visual" },
        { id: 2, nome: "Deficiência Auditiva" }
      ];
      (DeficienciaServices.listarDeficiencia as jest.Mock).mockResolvedValue(mockDeficiencias);

      // Act
      await DeficienciaController.listar(mockRequest as Request, mockResponse as Response);

      // Assert
      expect(DeficienciaServices.listarDeficiencia).toHaveBeenCalled();
      expect(mockResponse.json).toHaveBeenCalledWith(mockDeficiencias);
    });
  });

describe("buscar", () => {
  it("deve buscar uma deficiência pelo nome e retornar status 200", async () => {
    // Arrange
    const nome = "Deficiência Motora";
    const deficienciaRetornada = { id: 3, nome: "Deficiência Motora" };
    
    mockRequest = {
      params: { nome }
    };
    
    (DeficienciaServices.buscarDeficiencia as jest.Mock).mockResolvedValue(deficienciaRetornada);
    
    // Act
    await DeficienciaController.buscar(mockRequest as Request, mockResponse as Response);
    
    // Assert
    expect(DeficienciaServices.buscarDeficiencia).toHaveBeenCalledWith(nome);
    expect(mockResponse.json).toHaveBeenCalledWith(deficienciaRetornada);
  });
  
  it("deve retornar status 404 quando a deficiência não for encontrada", async () => {
    // Arrange
    const nome = "Deficiência Inexistente";
    
    mockRequest = {
      params: { nome }
    };
    
    (DeficienciaServices.buscarDeficiencia as jest.Mock).mockResolvedValue(null);
    
    // Act
    await DeficienciaController.buscar(mockRequest as Request, mockResponse as Response);
    
    // Assert
    expect(DeficienciaServices.buscarDeficiencia).toHaveBeenCalledWith(nome);
    expect(mockResponse.status).toHaveBeenCalledWith(404);
    expect(mockResponse.json).toHaveBeenCalledWith({ error: "Deficiencia não encontrado" });
  });
});

  describe("criar", () => {
    it("deve criar uma nova deficiência e retornar status 201", async () => {
      // Arrange
      const novaDeficiencia = {
        nome: "Deficiência Motora"
      };
      
      mockRequest = {
        body: novaDeficiencia
      };
      
      const deficienciaRetornada = { id: 3, ...novaDeficiencia };
      (DeficienciaServices.criarDeficiencia as jest.Mock).mockResolvedValue(deficienciaRetornada);

      // Act
      await DeficienciaController.criar(mockRequest as Request, mockResponse as Response);

      // Assert
      expect(DeficienciaServices.criarDeficiencia).toHaveBeenCalledWith(novaDeficiencia.nome);
      expect(mockResponse.status).toHaveBeenCalledWith(201);
      expect(mockResponse.json).toHaveBeenCalledWith(deficienciaRetornada);
    });
  });


  describe("deletar", () => {
    it("deve deletar uma deficiência existente e retornar status 200", async () => {
      // Arrange
      mockRequest = {
        params: { nome: "Deficiência Visual" }
      };
      
      (DeficienciaServices.deletarDeficiencia as jest.Mock).mockResolvedValue(true);

      // Act
      await DeficienciaController.deletar(mockRequest as Request, mockResponse as Response);

      // Assert
      expect(DeficienciaServices.deletarDeficiencia).toHaveBeenCalledWith("Deficiência Visual");
      expect(mockResponse.json).toHaveBeenCalledWith({ message: "Deficiência deletada" });
    });

    it("deve retornar status 404 quando deficiência não for encontrada", async () => {
      // Arrange
      mockRequest = {
        params: { nome: "Deficiência Inexistente" }
      };
      
      (DeficienciaServices.deletarDeficiencia as jest.Mock).mockResolvedValue(false);

      // Act
      await DeficienciaController.deletar(mockRequest as Request, mockResponse as Response);

      // Assert
      expect(DeficienciaServices.deletarDeficiencia).toHaveBeenCalledWith("Deficiência Inexistente");
      expect(mockResponse.status).toHaveBeenCalledWith(404);
      expect(mockResponse.json).toHaveBeenCalledWith({ error: "Deficiência não encontrada" });
    });
  });
});