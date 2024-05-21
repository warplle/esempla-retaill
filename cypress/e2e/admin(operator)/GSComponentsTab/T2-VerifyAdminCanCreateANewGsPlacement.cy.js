import { getAdminBaseUrl, getAdminUserName, getAdminPassword, generateRandomNumber, generateRandomString, generateRandomEmail, generateRandomBicCode,
    generateRandomStringRU, generateRandomStringWithNumbers, generateRandomStringOnlyUpperCase } from '../../../support/functions.js';

const baseUrl = getAdminBaseUrl();
const adminUserName = getAdminUserName();
const adminPassword = getAdminPassword();
const bic = "00" + generateRandomStringOnlyUpperCase(2) + generateRandomStringOnlyUpperCase(2) + generateRandomStringWithNumbers(2) + generateRandomNumber(3);
const IDNO = generateRandomNumber(13);
const name = generateRandomString(6) + " " + generateRandomString(7);
const nameRu = generateRandomStringRU(6) + " " + generateRandomStringRU(7);
const nameEn = generateRandomString(6) + " " + generateRandomString(7);
const isinCode = "MD12312" + generateRandomNumber(5);
const nominalValue = "3" + generateRandomNumber(2);
const currentPrice = "1" + generateRandomNumber(2);
const indicativeVolume = "1" + generateRandomNumber(2);
const minimumOrder = "1" + generateRandomNumber(1);
const couponRate = '7'; // governmentsBonds type
const securitiesNameTreasuryBills = "Treasury Bills";
const securitiesNameGovernmentBonds = 'Government Bonds';



describe('Verify admin can create a new GS Placement', () => {

    it('Admin should be able to create a new valid GS placement Treasury Bills with valid data in all fields', () => {
        
        cy.AdminSimpleLogin(baseUrl, adminUserName, adminPassword);

        cy.contains('GS Components').click(); // clicking on the "GS Components" drop-down option
        cy.get('a[routerlink="/government-securities-placement"]').click();  // clicking on the "GS Placement" option
        cy.wait(1000);
        cy.get('[data-cy="entityCreateButton"]').debug().click(); // clicking on the [Add new]

         // enter data in the fields
         cy.get('#field_securitiesName').select('Treasury Bills').invoke('change');
         cy.get('#field_isinCode').type(isinCode);
         cy.SelectRandomCirculationTermTreasuryBills();
         //cy.get('.ng-input').type(circulationTerm);
         cy.get('#field_nominalValue').type(nominalValue);
         cy.get('#field_currentPrice').type(currentPrice);
         cy.get('#field_currency').select("MDL");
         //cy.SelectRandomCurrency()
         cy.GenerateCurrentDateTimeIssueDateField();
         //cy.get('#field_maturityDate').type('03.04.2024');
         //cy.GenerateCurrentDateTimeMaturityDateField();
         //cy.get('#field_yieldValue').type(yieldData, {force: true});
         // secondary market sell "NO"
         // mandatory Early Redemption "NO"
         cy.GenerateCurrentDateTimeStartDateFieldTB();
         cy.GenerateFutureDateTimeEndDateFieldTB();
         cy.get('#field_indicativeVolume').type(indicativeVolume);
         cy.get('#field_minOrder').type(minimumOrder);
         //cy.get('#field_maxOrder').type(maximumOrder);
         //cy.get('#field_maxOwnership').type(maximumOwnershipQuantity);
         // fees applied "NO"
 
         cy.get('#save-entity').click();

         // validating dentered data
         cy.ViewDetailsCreatedTreasuryBills(securitiesNameTreasuryBills, isinCode, nominalValue, currentPrice, indicativeVolume, minimumOrder);
        
    });

    it('Admin should be able to create a new valid GS placement Government Bonds with valid data in all fields', () => {
        
        cy.AdminSimpleLogin(baseUrl, adminUserName, adminPassword);

        cy.contains('GS Components').click(); // clicking on the "GS Components" drop-down option
        cy.get('[routerlink="/government-securities-placement"]').click();  // clicking on the "GS Placement" option
        cy.get('[data-cy="entityCreateButton"]').click().click(); // clicking on the [Add new] button

        cy.get('#field_securitiesName').select('Government Bonds');
        cy.get('#field_isinCode').type(isinCode);
        cy.SelectRandomCirculationTermGovernmentBonds();
        //cy.get('.ng-input').type(circulationTerm);
        cy.get('#field_nominalValue').type(nominalValue);
        //cy.get('#field_currentPrice').type(currentPrice);
        cy.get('#field_currency').select("MDL");
        //cy.SelectRandomCurrency()
        cy.GenerateCurrentDateTimeIssueDateField();
        cy.get('#field_couponRate').type(couponRate, {force: true}); // se introduce singur sau introducem noi 
        cy.GenerateDateTimeCouponPaymentDates(); // ce data de introdus ?!!!
        // secondary market sell "NO"
        // mandatory Early Redemption "NO"
        cy.GenerateCurrentDateTimeStartDateFieldGB();
        cy.GenerateFutureDateTimeEndDateFieldGB();
        cy.get('#field_indicativeVolume').type(indicativeVolume);
        cy.get('#field_minOrder').type(minimumOrder);
        // fees applied "NO"

        cy.get('#save-entity').click();
        cy.ViewDetailsCreatedGovernmentBonds(securitiesNameGovernmentBonds, isinCode, nominalValue, indicativeVolume, minimumOrder);
    });
});

    describe('Verify admin can view details of a commercial bank', () => {

        it.skip('Admin should be able to view details of a valid bank', () => {
            
            cy.AdminSimpleLogin(baseUrl, adminUserName, adminPassword);
    
            cy.get('.dropdown-toggle').eq(4).click(); // clicking on the "Classifiers" drop-down option
            cy.get('a[routerlink="/cf-commercial-banks"]').click();  // clicking on the "Cf Commercial Banks" option
            //cy.get('a[data-cy="entityDetailsButton"]').eq(1).click(); // clicking on the [Details] button

            cy.get('#jh-create-entity').click(); // clicking on the [Add new] button

            // Entering data in the fields
            cy.get('#field_bic').type(bic);
            cy.get('#field_idno').type(IDNO);
            cy.get('#field_name').type(name);
            cy.get('#field_nameRu').type(nameRu);
            cy.get('#field_nameEn').type(nameEn);

            cy.get('#save-entity').click(); // clicking on the [Save] button 

            cy.get('.alert').should('contain', 'A new Cf Commercial Banks is created with identifier');
            cy.get(':nth-child(3) > .page-link').click(); // page 1
            cy.get('fa-icon[icon="sort"]').eq(0).click(); // sorting by Bic

            cy.ViewDetailsCreatedBank(bic, IDNO, name, nameRu, nameEn); // validaing data of the createad bank

            cy.contains('Cf Commercial Banks');
            cy.get('button[data-cy="entityDetailsBackButton"]').should('exist').should('be.visible').should('contain', 'Back'); // [Back] button
            cy.get('span[jhitranslate="entity.action.edit"]').should('exist').should('be.visible').should('contain', 'Edit'); // [Edit] button
            cy.get('button[data-cy="entityDetailsBackButton"]').click(); // clicking on the [Back] button

            cy.DeleteCreatedBank(IDNO);
        });
    });

        // This test outputs the activated fields from the critical fields management option
        describe('Output all activated options from critical fields management', () => {

            it.skip('Output activated fields', () => {
                
                cy.AdminSimpleLogin(baseUrl, adminUserName, adminPassword);
        
                cy.get('.dropdown-toggle').eq(5).click(); // clicking on the "Administration" drop-down option
                cy.get('a[href="/profile-edit-management"]').click();  // clicking on the "Critical fields management" option

                // outputting the options that have status "Activated"
                cy.DisplayOnlyActiveFields();

  });
});