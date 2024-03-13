import { Schema } from "mongoose";

const usePlugin = function(schema: Schema<any>){
    schema.pre("find", function(){
        const q = this.getQuery()
        this.setQuery({archived: false, ...q})
    })
    
    schema.statics.findById = function(id: string, archived = false){
    return this.findOne({_id: id, archived})
    }
    
    schema.pre("findOne", function(){
        const q = this.getQuery()
        this.setQuery({archived: false, ...q})
    })
    

    schema.pre("findOneAndDelete", function(){
        const q = this.getQuery()
        this.setQuery({archived: false, ...q})
    })

    schema.pre("deleteOne", function(){
        const q = this.getQuery()
        this.setQuery({archived: false, ...q})
    })

    schema.pre("deleteMany", function(){
        const q = this.getQuery()
        this.setQuery({archived: false, ...q})
    })
    
    schema.statics.findByIdAndDelete = function(id, archived=false){
        return this.findOne({_id: id, archived})
    }
    
    schema.statics.findByIdAndRemove = function(id, archived=false){
        return this.findOne({_id: id, archived})
    }

}

export default {usePlugin}