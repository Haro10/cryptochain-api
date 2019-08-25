const Block = require('./block')
const cryptoHash = require('./crypto-hash')

class Blockchain {
    constructor() {
        // this.chain = [];
        // this.chain[0] = Block.genesis()
        this.chain = [Block.genesis()];
    }

    addBlock({
        data
    }) {
        const lastBlock = this.chain[this.chain.length - 1]
        // const newBlock = new Block({data, hash, lastHash})
        const newBlock = Block.mineBlock({
            data,
            lastBlock
        })
        this.chain.push(newBlock)
    }

    static isValidChain(chain) {
        if (JSON.stringify(chain[0]) !== JSON.stringify(Block.genesis())) {
            return false;
        }
        for (let i = 1; i < chain.length; i++) {
            const block = chain[i];
            const actualLastHash = chain[i - 1].hash;
            const {
                timestamp,
                lastHash,
                hash,
                data
            } = block
            if (actualLastHash !== chain[i].lastHash) {
                console.log('[actualLastHash]')
                return false;
            }
            const validatedHash = cryptoHash(
                timestamp,
                lastHash,
                data
            )
            if (validatedHash !== hash) {
                console.log('[validatedHash]')
                return false;
            }
        }
        return true
    }

    replaceChain(newChain) {
        if (newChain.length <= this.chain.length) {
            return;
        }
        if (!Blockchain.isValidChain(newChain)) {
            return;
        }
        this.chain = newChain
    }
}

module.exports = Blockchain;