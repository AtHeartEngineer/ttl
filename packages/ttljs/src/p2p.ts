import { createLibp2p, Libp2pOptions } from 'libp2p'
import { webSockets } from '@libp2p/websockets'
import { noise } from '@chainsafe/libp2p-noise'
import { mplex } from '@libp2p/mplex'
import { createFromJSON } from '@libp2p/peer-id-factory'

interface IPeerId {
  id: string
  privKey: string
  pubKey: string
}

export default class P2P {
  private node: any
  desiredPeers: string[]
  opts: Libp2pOptions

  constructor(peerId: IPeerId | null = null, desiredPeers: string[] = []) {
    this.node = null
    this.opts = {
      addresses: {
        listen: ['/ip4/0.0.0.0/tcp/13737/ws']
      },
      transports: [webSockets()],
      connectionEncryption: [noise()],
      streamMuxers: [mplex()],
    }
    if (peerId !== null) {
      this.assignPeerId(peerId)
    }
    this.desiredPeers = desiredPeers // friends addresses
  }

  async assignPeerId(peerId: IPeerId) {
    this.opts.peerId = await createFromJSON(peerId)
  }

  async start() {
    this.node = await createLibp2p(this.opts)
    console.debug('libp2p has started')
  }

  async getAddress() {
    const listenAddrs = this.node.getMultiaddrs()
    console.debug('libp2p is listening on the following addresses: ', listenAddrs)
  }

  async stop() {
    await this.node.stop()
    console.debug('libp2p has stopped')
  }
}