/**
 * Servicio para generar números aleatorios
 */
export const RandomNumberService = {
  /**
   * Devuelve un número aleatorio entre 1 y 10
   */
  getRandomNumber: (): number => {
    return Math.floor(Math.random() * 10) + 1;
  }
};
