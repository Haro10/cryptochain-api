const Blockchain = require('./blockchain');
const Block = require('./block')


describe('BlockChain', () => {
    let blockchain;

    beforeEach(() => {
        blockchain = new Blockchain();
    })

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

    describe('isValidChain', () => {
        describe('first block data is not genesis data', () => {
            it('return false', () => {
                blockchain.chain[0] = {
                    data: 'fake-genesis'
                }
                expect(Blockchain.isValidChain(blockchain.chain)).toBe(false);
            })
        })

        describe('when the chanin starts with the genesis block and has mutiple blocks', () => {
            beforeEach(() => {
                blockchain.addBlock({
                    data: 'bears'
                });
                blockchain.addBlock({
                    data: 'bears 2'
                });
                blockchain.addBlock({
                    data: 'bears 3'
                });
            })
            describe('and a lastHash reference has changed', () => {
                it('return false', () => {
                    blockchain.chain[2].lastHash = 'broken-lastHash'
                    expect(Blockchain.isValidChain(blockchain.chain)).toBe(false)
                })
            });
            describe('and the chain contains a block with an invalid field', () => {
                it('return false', () => {
                    blockchain.chain[2].data = 'some-broken-data'
                    expect(Blockchain.isValidChain(blockchain.chain)).toBe(false)
                });
            });

            describe('and the chain not contains any invalid blocks', () => {
                it('return true', () => {
                    expect(Blockchain.isValidChain(blockchain.chain)).toBe(true)
                });
            });
        })
    });

})