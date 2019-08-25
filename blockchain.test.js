const Blockchain = require('./blockchain');
const Block = require('./block')


describe('BlockChain', () => {
    const blockchain = new Blockchain();

    it('Block Chain is an array instance', () => {
        expect(blockchain.chain instanceof Array).toBe(true)
    });

    it('start with the genesis Block', () => {
        expect(blockchain.chain[0]).toEqual(Block.genesis())
    });

    it('Can add a new block', () => {
        const newData = 'new Data'

        blockchain.addBlock({
            data: newData
        });

        expect(blockchain.chain[blockchain.chain.length - 1].data).toEqual(newData)
    });
})