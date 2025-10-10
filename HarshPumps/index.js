const express=require('express')
const path=require('path')
const nodemailer=require('nodemailer')
const app=express()
app.use(express.static(path.join(__dirname,'public')))
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.set("view engine","ejs")
app.get('/',(req,res)=>{
    res.render("index")
})
app.get('/about-us',(req,res)=>{
    res.render("aboutus")
})
app.get('/products/self-priming',(req,res)=>{
    res.render("self-priming")
})
app.get('/products/horizontal-submersible',(req,res)=>{
    res.render("horizontal-submersible")
})
app.get('/products/vertical-submersible',(req,res)=>{
    res.render("vertical-submersible")
})
app.get('/products/centrifugal',(req,res)=>{
    res.render("centrifugal")
})
app.get('/contact-us',(req,res)=>{
    res.render("contact-us",{success:null})
})
app.post('/contact-us',async (req,res)=>{
    const {name,email,phone,message}=req.body
    let transporter=nodemailer.createTransport({
        service:'gmail',
        auth:{
            user:'',
            pass:''
        }
    })
    let mailOptions={
        from:`"${name}" <${email}>`,
        to:'',
        subject:'New Contact Form Submission',
        html:`
            <h3>New Contact Form Submission</h3>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone}</p>
            <p><strong>Message:</strong><br/>${message}</p>
        `
    }
    try{
        await transporter.sendMail(mailOptions)
        res.render('contact-us',{success:true})
    }catch(err){
        console.error("Email send error:",err)
        res.render('contact-us',{success:false})
    }
})
app.listen(3000)