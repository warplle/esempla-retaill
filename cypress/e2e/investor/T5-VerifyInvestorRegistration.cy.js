import { getInvestorBaseUrl, getInvestorIDNP, getInvestorPassword,  generateRandomNumber, generateRandomString, generateRandomEmail, generateRandomBicCode,
    generateRandomStringRU, generateRandomStringWithNumbers, generateRandomStringOnlyUpperCase } from '../../support/functions.js';

const investorBaseUrl = getInvestorBaseUrl();
const investorIDNP = getInvestorIDNP();
const investorPassword = getInvestorPassword();


describe('Verify Investor Account creation', () => {


    it('Investor should be able to authenticate with valid data in all fields, with MConnect extracting option', () => {

        cy.setInvestorCredentials(investorIDNP, investorPassword);
        cy.InvestorRegistration(investorBaseUrl);

        cy.get('a[ng-reflect-router-link="subscription-calendar,started"]').click(); // clicking on the "Subscription calendar" option
        cy.wait(1000);
        cy.get('a[href="/account/profile"]').eq(1).click(); // clicking on the "Profile" option
        //cy.contains('Profile').click();

        cy.url().should('include', '/kyc/terms');
        
        cy.contains('Know Your Client - Registration Terms and Conditions');

        cy.get('.h2-custom')
        .should('exist')
        .should('be.visible')
        .should('contain', 'Terms and Conditions'); //validating the text

        cy.get('.p-custom')
        .should('exist')
        .should('be.visible')
        .should('contain', 'Please confirm that you have read and agree to the') // text validation
        
        cy.get('.form-check-label')
        .should('exist')
        .should('be.visible')
        .should('contain', 'I read and agree with the Terms and Conditions'); // checkbox text validation

        cy.get('#field_declaration').click(); // clicking on the checkbox 
        
        cy.get('.btn').click();

        cy.url().should('include', '/account/profile');

        cy.get('button[data-cy="entityEditButton"]').click(); // clicking on the [Edit] button
        cy.get('.modal-content')
        .should('exist')
        .should('be.visible')
        .should('contain', 
        "Please note that as a result of pressing button, certain data would be automatically updated from the state registers. Are you sure to proceed?");

        cy.get('button[data-cy="entityConfirmDeleteButton"]').click(); // clicking on the [Yes] button

    });
    
    it.skip('Investor should be able to authenticate with valid data in all fields, without MConnect extracting option', () => {

                
    });
});
