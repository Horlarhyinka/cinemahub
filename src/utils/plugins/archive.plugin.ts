import { Schema } from "mongoose";

const usePlugin = function(schema: Schema<any>){
    schema.pre("find", function(){
        const q = this.getQuery()
        this.setQuery({archived: false, ...q})
    })
    
    schema.pre("findOne", function(){
        const q = this.getQuery()
        this.setQuery({archived: false, ...q})
    })
    

    schema.pre("findOneAndDelete", function(){
        const q = this.getQuery()
        return this.model.findOneAndUpdate({...q}, {archived: true}, {new: true})
    })

}

export default {usePlugin}