describe("Appointment Page Test", () => {
    beforeEach(() => {
      cy.visit("http://localhost:4200/login");
      cy.url().should("include", "/login");
      cy.contains("h1", "Intra in contul tau").should("be.visible");
  
      // Verifică input-urile
      cy.get('input[id="email"]')
        .should("be.visible")
        .type("prof.matei@usv.ro");
      cy.get('input[id="password"]').should("be.visible").type("profpass1");
  
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
      cy.get("mat-card-header h4").each(($el) => {
        cy.wrap($el).should("be.visible"); // Verifică dacă titlurile examenelor sunt vizibile
      });
  
      // Verifică dacă statusul este corect afișat și stilizat
      cy.get("mat-card-content").each(($el) => {
        cy.wrap($el).contains("Status:").should("be.visible"); // Verifică că textul "Status:" este vizibil
  
        // Verifică dacă statusul are culoarea corectă în funcție de valoare
        cy.wrap($el)
          .find("span")
          .should(($span) => {
            const statusText = $span.text().toLowerCase();
            // Verifică că statusul are culoarea corectă
            if (statusText === "scheduled") {
              expect($span).to.have.class("text-green-600");
            } else if (statusText === "pending") {
              expect($span).to.have.class("text-yellow-600");
            } else if (statusText === "rejected") {
              expect($span).to.have.class("text-red-600");
            }
          });
      });
    });
  });
  