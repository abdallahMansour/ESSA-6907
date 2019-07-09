import CRDTEditorManager from './crdt-editor-manager'
class ReplicatedPageManager{
    constructor() {
        this.pages = {}
        this.sendCallback = null
        this.isConnected = false
    }
    setConnectionStatus(isConnected){
        this.isConnected = isConnected
    }
    setSendCallback(sendCallback){
        this.sendCallback = sendCallback
    }
    getOrCreatePageEditorManager(pageId) {
        if(this.pages[pageId] === undefined || this.pages[pageId] === null)
          this.pages[pageId] = new CRDTEditorManager(this.sendCallback, pageId, 400, this.isConnected)
        
        return this.pages[pageId]
    }

}
export default ReplicatedPageManager