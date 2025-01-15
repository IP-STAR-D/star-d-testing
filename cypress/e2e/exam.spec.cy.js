describe("Exams Page Test", () => {
  beforeEach(() => {
    cy.visit("http://localhost:4200/login");
    cy.url().should("include", "/login");
    cy.contains("h1", "Intra in contul tau").should("be.visible");

    cy.get('input[id="email"]').should("be.visible").type("raul.luculescu@student.usv.ro");
    cy.get('input[id="password"]').should("be.visible").type("default_password");

    cy.contains("button", "Autentificare").click();
    cy.log("Click pe butonul de autentificare");

    cy.url().should("include", "/student/exams");
    cy.log("Am ajuns pe pagina de examene");
  });

  it("should display the exam cards, their status and the time range", () => {
    cy.get("mat-card").should("have.length.greaterThan", 0);

    cy.get("mat-card-header h6").each(($el) => {
      cy.wrap($el).should("be.visible");
    });

    cy.get("mat-card-content").each(($el) => {
      if ($el.find("div > span:first-child").length > 0) {
        cy.wrap($el)
          .find("div > span:first-child")
          .invoke("text")
          .then((statusText) => {
            cy.wrap($el)
              .find("div > span:nth-child(2)")
              .invoke("text")
              .then((timeRange) => {
                const combinedText = `${statusText.trim()} ${timeRange.trim()}`;
                cy.log(`Combined Text: ${combinedText}`);

                const validPatterns = [
                  /^PROGRAMAT\s+\d{2}:\d{2}\s*-\s*\d{2}:\d{2}$/,
                  /^RESPINS\s+\d{2}:\d{2}\s*-\s*\d{2}:\d{2}$/,
                  /^IN ASTEPTARE\s+\d{2}:\d{2}\s*-\s*\d{2}:\d{2}$/,
                  /^Nu exista programari pentru acest examen\.$/,
                ];
                expect(validPatterns.some((pattern) => pattern.test(combinedText))).to.be.true;
              });
          });
      } else {
        cy.wrap($el).find("div.text-gray-500").invoke("text").should("eq", "Nu exista programari pentru acest examen.");
      }
    });
  });
});
