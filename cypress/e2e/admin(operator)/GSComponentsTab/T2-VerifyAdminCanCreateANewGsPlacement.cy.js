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

    it.skip('Admin should be able to create a new valid GS placement Treasury Bills with valid data in all fields', () => {
        
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