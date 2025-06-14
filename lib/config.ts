// Configuración solo para el cliente - sin API keys sensibles
export const CLIENT_CONFIG = {
  // Configuraciones públicas que pueden estar en el cliente
  MAX_FILE_SIZE: 10 * 1024 * 1024, // 10MB
  SUPPORTED_FORMATS: ["png", "jpg", "jpeg", "gif", "webp"],
  DEFAULT_BOX_DIMENSIONS: {
    width: 190,
    height: 270,
    depth: 25,
  },
}

export const BACKGROUND_REMOVAL_PROVIDERS = [
  {
    id: "local-simple",
    name: "Procesamiento Local Básico",
    description: "Algoritmo simple, gratuito",
    requiresApiKey: false,
    cost: "Gratuito",
  },
  {
    id: "local-advanced",
    name: "Procesamiento Local Avanzado",
    description: "Detección de bordes, gratuito",
    requiresApiKey: false,
    cost: "Gratuito",
  },
  {
    id: "removebg",
    name: "Remove.bg",
    description: "API premium con alta precisión",
    requiresApiKey: true,
    cost: "Pago por uso",
  },
]
