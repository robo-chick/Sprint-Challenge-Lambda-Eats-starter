describe("Test inputs and submit form", () => {
    beforeEach(function() {
        cy.visit('http://localhost:3000/pizza');
    });

    it("Add test to inputs and submit form", function() {
        cy.get('input[name="name"]')
        .type("Tasha")
        .should("have.value", "Tasha")

        cy.get('select[name="size"]')
        .select('M')
        .should("have.value", "M")

        cy.get('[type="radio"]')
        .check()
        .should("be.checked")
        

        cy.get('textarea')
        .type("Leave on table by door")
        .should("have.value", "Leave on table by door")

        cy.get('button')
        .click( {force: true});
    })
});