const assert = require("assert");
const ganache = require("ganache-cli");
const Web3 = require("web3");

const web3 = new Web3(ganache.provider());

const compiledFactory  = require("../ethereum/build/CampaignFactory.json");
const compiledCampaign = require("../ethereum/build/Compaign.json");

let accounts;
let factory;
let compaignAddress;
let campaign;

beforeEach(async () => {
    accounts = await web3.eth.getAccounts();
    factory =  await new web3.eth.Contract(JSON.parse(compiledFactory.interface)).deploy({data: compiledFactory.bytecode}).send({from : accounts[0], gas: "1000000"});

    await factory.methods.createCampaign('100').send({from : accounts[0], gas: '1000000'});
    [compaignAddress] = await factory.methods.getDeployedCampaigns().call();

    campaign = await new web3.eth.Contract(JSON.parse(compiledCampaign.interface), compaignAddress);

});

describe('Compaigns', () => {
    it('deplyes and factory and compaign', async() => {
        assert.ok(factory.options.address);
        assert.ok(campaign.options.address);
    });

    it('creator should be manager', async() => {
        const manager = await campaign.methods.manager().call();
        assert.equal(accounts[0], manager);
    });

    it('allow people to contribute money and marks them as approvers' , async() => {
        await campaign.methods.contribute().send({
            value: '200',
            from : accounts[1]
        });
        const isContributor = await campaign.methods.approvers(accounts[1]).call();
        assert(isContributor);
    });

    it('requries minimum contribution', async() => {
        try {
            await campaign.methods.contribute().send({
                value: '5',
                from: accounts[1]
            })
            assert(false);
        } catch (error) {
            assert(true);
        }
    });

    it('allows a manager payment request', async() => {
        await campaign.methods.createRequest('Buy Phone', '100', accounts[1]).send({
            from: accounts[0],
            gas: '1000000'
        });

        const request =  await campaign.methods.reqeusts(0).call();
        assert.equal('Buy Phone', request.description);
    });

    it('it process requests' , async() => {
        await campaign.methods.contribute().send({
            from : accounts[0],
            value: web3.utils.toWei('10', 'ether')
        });

        await campaign.methods.createRequest('A', web3.utils.toWei('5', 'ether'), accounts[0]).send({
            from: accounts[1],
            gas: "1000000"
        });
        
        await campaign.methods.approveRequest(0).send({from: accounts[0], gas: '1000000'});

        await campaign.methods.finalizeRequest(0).send({
            from: accounts[0], gas: '1000000'
        });
        
        let balance = await web3.eth.getBalance(accounts[1]);
        balance = web3.utils.fromWei(balance, 'ether');
        console.log(balance);
        balance = parseFloat(balance);
        assert(balance > 104)


    })
})