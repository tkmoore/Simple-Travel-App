global.alert = jest.fn();

import { checkForValidText } from "../src/client/js/textChecker"
  
describe("Testing the submit functionality", () => {  
    test("Is the function is defined", () => {
          expect(checkForValidText).toBeDefined();
    }),
    test('If no value entered, returns false', () => {
        const result = checkForValidText('');
        expect(global.alert).toHaveBeenCalledWith('Form must not be left blank when submitting. Please provide a valid input to analyze.');
        expect(result).toBe(false);
    }),
    test("If passed non alpha-numeric value, return false", () => {
        const result = checkForValidText('%$%^*(');
        expect(global.alert).toHaveBeenCalledWith('Input contains invalid characters. Only letters, numbers, periods, and spaces are allowed.');
        expect(result).toBe(false);
    })
});