describe("Test Login și Logout cu redirecționare", () => {
  const email = "claudiu.baroiu@student.usv.ro";
  const password = "default_password";

  it("Autentificare, redirecționare și testare logout", () => {
    cy.visit("http://localhost:4200/login"); // URL-ul paginii de login

    cy.get('input[name="email"]').type(email);
    cy.get('input[name="password"]').type(password);
    cy.get('button[type="submit"]').click();

    cy.url().should("include", "http://localhost:4200/student/exams"); // Verifică dacă ai ajuns pe pagina corectă după login

    cy.go("back"); // Acesta va da click pe butonul "back" al browser-ului, deci te va duce pe pagina de login

    cy.url().should("include", "http://localhost:4200/login"); // Verifică URL-ul de login

    cy.contains("Sunteti deja autentificat!"); // Verifică dacă textul de pe pagina de logout este corect
    cy.get("button").contains("Delogare").should("be.visible"); // Verifică dacă butonul de logout este vizibil
    cy.get("button").contains("Continua spre site").should("be.visible"); // Verifică dacă butonul de continuare este vizibil

    cy.get("button").contains("Delogare").click();

    cy.url().should("include", "/login"); // Verifică URL-ul de login
    cy.contains("Intra in contul tau"); // Verifică textul de pe pagina de login
  });
});
