const Block = require('./block')

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

}

module.exports = Blockchain;