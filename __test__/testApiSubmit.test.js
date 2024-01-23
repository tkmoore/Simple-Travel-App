import { apiSubmit } from "../src/client/js/formHandler"
  
describe("Testing the submit functionality", () => {  
    test("Is the function is defined", () => {
          expect(apiSubmit).toBeDefined();
    })
});