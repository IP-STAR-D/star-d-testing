describe("Appointment Page Test", () => {
  beforeEach(() => {
    cy.visit("http://localhost:4200/login");
    cy.url().should("include", "/login");
    cy.contains("h1", "Intra in contul tau").should("be.visible");

    // Verifică input-urile
    cy.get('input[id="email"]').should("be.visible").type("alexito.olar@gmail.com");
    cy.get('input[id="password"]').should("be.visible").type("default_password");

    // Apasă pe butonul de autentificare și loghează pentru debug
    cy.contains("button", "Autentificare").click();
    cy.log("Click pe butonul de autentificare");

    // Verifică dacă URL-ul s-a schimbat corect
    cy.url().should("include", "/professor/appointments");
    cy.log("Am ajuns pe pagina de programări");
  });

  it("should display the appointment cards and their status", () => {
    // Verifică prezența cardurilor de programări
    cy.get("mat-card").should("have.length.greaterThan", 0);

    // Verifică dacă titlul examenului este vizibil în fiecare card
    cy.get("mat-card-header h6").each(($el) => {
      cy.wrap($el).should("be.visible"); // Verifică dacă titlurile examenelor sunt vizibile
    });

    cy.get("mat-card").each(($card) => {
      // Verifică că textul "Status:" este vizibil
      cy.wrap($card).find("mat-card-content").eq(0).find("span").eq(0).contains("Status:").should("be.visible");

      // Verifică dacă statusul are culoarea corectă în funcție de valoare
      cy.wrap($card)
        .find("mat-card-content")
        .eq(0)
        .find("span")
        .eq(1)
        .should(($span) => {
          const statusText = $span.text().toLowerCase().trim();
          // Verifică că statusul are culoarea corectă
          if (statusText == "programat") {
            expect($span).to.have.class("text-green-600");
          } else if (statusText == "in asteptare") {
            expect($span).to.have.class("text-yellow-600");
          } else if (statusText == "respins") {
            expect($span).to.have.class("text-red-600");
          } else if (statusText == "anulat") {
            expect($span).to.have.class("font-semibold");
          } else {
            throw new Error(`Unexpected status: ${statusText}`);
          }
        });
    });
  });
});
