import { Schema } from "mongoose";

const usePlugin = function(schema: Schema<any>){
    schema.pre("find", function(){
        const { archived } = this.getQuery()
        if(!archived){
            const qrys = this.getQuery()
            this.setQuery({...qrys, archived: false})
        }
    })
    
    schema.statics.findById = function(id: string, archived = false){
    return this.findOne({_id: id, archived})
    }
    
    schema.statics.findOne = function(query: object, archived=false){
        return this.findOne({...query, archived})
    }
    
    schema.statics.deleteOne = function(query: object, archived=false){
        
    }
    
    schema.statics.findByIdAndDelete = function(){
    
    }
    
    schema.statics.findByIdAndRemove = function(){
        
    }

}

export default {usePlugin}