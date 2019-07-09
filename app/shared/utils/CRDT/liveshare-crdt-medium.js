import {Mutex} from 'async-mutex';

class LiveShareCRDTMedium { 
    constructor(senderCallback, syncInterval, pageId, isConnected){
        this.senderCallback = senderCallback
        this.syncInterval = syncInterval
        this.maxOperationsCount = 2000
        this.queue = []
        this.pageId = pageId
        this.isConnected = isConnected
        this.mutex = new Mutex()  
        let that = this
        setInterval(() =>{
            this.sendOperations(that)
        }, syncInterval)
   
    }
    send(op){
        let that = this
        this.mutex
            .acquire()
            .then(function(release) {
                that.queue.push(op)
                release()
            })
    }
    sendOperations(that) {
        that.mutex
        .acquire()
        .then(function(release) {
            if(that.queue.length > 0){
                if(that.isConnected)
                    that.senderCallback(that.queue.slice(0, that.maxOperationsCount), that.pageId)
                that.queue.splice(0, that.maxOperationsCount)
            }
            release()
        })
    }


}

export default LiveShareCRDTMedium