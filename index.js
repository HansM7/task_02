import fs from "fs"

class Container{

    constructor(){
        this.file="my_file.txt"
    }

    async save(product){
        try {
            if (typeof(product)!="object") {
                throw Error("Required object format")
            }else{
                if (product.title && product.price && product.thumbnail ) {
                    
                    let newProduct={}
                    
                    if(fs.existsSync(this.file)){
                        // Register
                        let allData=await fs.promises.readFile(this.file, 'utf-8')

                        let dataJson=JSON.parse(allData)
                        const dataJsonlength=dataJson.length+1

                        newProduct.id=dataJsonlength
                        newProduct.title=product.title
                        newProduct.price=product.price
                        newProduct.thumbnail=product.thumbnail

                        dataJson=[...dataJson,newProduct]

                        await fs.promises.writeFile(this.file,JSON.stringify(dataJson, null, 2),'utf-8')
                        
                        return `The id asigned is ${dataJsonlength}`

                    }else{
                        // create and register
                        if(typeof(product.title)!="string"){
                            throw Error("The title atribute must be string")
                        }
                        if(typeof(product.price)!="number"){
                            throw Error("The price atribute must be numeric")
                        }
                        if(typeof(product.thumbnail)!="string"){
                            throw Error("The thumbnail atribute must be string")
                        }

                        newProduct.id=1
                        newProduct.title=product.title
                        newProduct.price=product.price
                        newProduct.thumbnail=product.thumbnail

                        await fs.promises.writeFile(this.file,JSON.stringify([newProduct], null, 2),'utf-8')

                        return `The id asigned is 1`
                    }
                }
                else{
                    throw Error(`Error: The format is: {title:"",price:"",thumbnail:""}`)
                }
                
            }
        } catch (error) {
            console.log(error)
        }
    }

    async getById(id){

        try {
            if (fs.existsSync(this.file)) {
                if (id) {
                    if (typeof(id)=="number") {
    
                        let allData=await fs.promises.readFile(this.file, 'utf-8')
                        let dataJson=JSON.parse(allData)

                        const dataLenght=Object.values(dataJson[id-1]).length
    
                        if (dataLenght!=0) {
                            return console.log(dataJson[id-1])
                        }else{
                            throw Error("The register don't exist")
                        }
                    }else{
                        throw Error("The paramether must be integer")
                    }
                }else{
                    throw Error("The method needs a paramether")
                }

            }else{
                throw Error("Sorry, the file don't exist")
            }
           
        } catch (error) {
            console.log(error)
        }
        
    }

    async getAll(){
        try {
            if (fs.existsSync(this.file)) {
                let allData=await fs.promises.readFile(this.file, 'utf-8')
                let dataJson=JSON.parse(allData)
                return console.log(dataJson);
            }else{
                throw Error("Sorry, the file don't exist")
            }
            
        } catch (error) {
            console.log(error)
        }
    }

    async getDeleteById(id){
        try {
            if (fs.existsSync(this.file)) {
                if (id) {
                    if (typeof(id)=="number") {
    
                        let allData=await fs.promises.readFile(this.file, 'utf-8')
                        let dataJson=JSON.parse(allData)

                        const dataLenght=Object.values(dataJson[id-1]).length
                        // Hago esto para contrastar que el objeto esté vacio, para poder llevar un buen control de los id -- 

                        if (dataLenght!=0) {

                            dataJson.splice(id-1,1,{}) // Dejo el objeto vacio
                            await fs.promises.writeFile(this.file,JSON.stringify(dataJson, null, 2),'utf-8')
                            return console.log("Record deleted successfully!")
                            
                        }else{
                            throw Error("The register don't exist");
                        }
                    }else{
                        throw Error("The paramether must be integer")
                    }
                }else{
                    throw Error("The method needs a paramether")
                }
            }else{
                throw Error("Sorry, the file don't exist")
            }
            
        } catch (error) {
            console.log(error)
        }
    }

    async deleteAll(){
        try {
            if (fs.existsSync(this.file)) {
                await fs.promises.writeFile(this.file,JSON.stringify([], null, 2),'utf-8')
                return console.log("Records deleted successfully!")
            }
            else{
                throw Error("Sorry, the file don't exist")
            }
        } catch (error) {
            console.log(error)
        }
    }

}

// Instance class

const data= new Container()

// Methods

// data.save({
//     title:"Shoes",
//     price:300,
//     thumbnail:"https://cdn-icons-png.flaticon.com/512/860/860895.png"
// })

// data.getAll()

// data.getById(1) //Parameter

// data.getDeleteById(2) //Parameter

// data.deleteAll()