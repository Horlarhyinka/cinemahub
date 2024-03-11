import { Schema } from "mongoose";

const usePlugin = function(schema: Schema<any>){
    schema.pre("find", function(){
        const { includeArchive } = this.getQuery()
        if(!includeArchive){
            const qrys = this.getQuery()
            this.setQuery({...qrys, archived: false})
        }
    })
    
    schema.statics.findById = function(){
    
    }
    
    schema.statics.findOne = function(){
    
    }
    
    schema.statics.deleteOne = function(){
    
    }
    
    schema.statics.findByIdAndDelete = function(){
    
    }
    
    schema.statics.findByIdAndRemove = function(){
        
    }
}

export default {usePlugin}