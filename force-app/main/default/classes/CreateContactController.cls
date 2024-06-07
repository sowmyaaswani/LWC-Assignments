public with sharing class CreateContactController {

    @AuraEnabled
    public static void createContact(Id accountId, String lastName, String title, String email, String phoneNumber) {
        Contact contact = new Contact(
            AccountId = accountId,
            LastName = lastName,
            Title = title,
            Email = email,
            Phone = phoneNumber
        );
        insert contact;
    }

    @AuraEnabled(cacheable=true)
    public static List<Account> getAccounts() {
        return [SELECT Id, Name FROM Account];
    }
}