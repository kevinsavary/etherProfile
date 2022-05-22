const etherProfile = artifacts.require("./etherProfile.sol");

contract('etherProfile', function (accounts) {
    let etherProfileInstance;
    const profileOwner = accounts[1];
    const profileViewer = accounts[2];
    const emailProfile1 = "kev@gmai.com"
    const emailProfile2 = "kev@yahoo.com"
    const profilePhotoUrl1 = "kev@gmai.com"
    const profilePhotoUrl2 = "kev@yahoo.com"

    before("set up contract instance for each test", async () => {
        etherProfileInstance = await etherProfile.deployed();
    });

    //should initialize with no profiles

    //it("should be initialized with no profiles", async () => {
    //    const numberOfArticles = await chainListInstance.getNumberOfArticles();
    //    assert.equal(numberOfArticles, 0, "number of articles must be zero");
    //    const articlesForSale = await chainListInstance.getArticlesForSale();
    //    assert.equal(articlesForSale.length, 0, "articles for sale should be empty");
    //});

    //Test case: Add a new profile

    it("should let us list a profile", async() => {
        const receipt = await etherProfileInstance.addProfile(emailProfile1,profilePhotoUrl1);
        const profile1 = await etherProfileInstance.profiles(1);
        assert.equal(profile1.emailAdress, emailProfile1, "email address must be: " + emailProfile1);
        assert.equal(profile1.profilePhotoUrl, profilePhotoUrl1, "email address must be: " + emailProfile1);
    });

});