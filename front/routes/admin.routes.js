const express = require("express");
const router = express.Router();
const axios = require("axios")
const upload = require("../midlewares/upload")
const request = axios.create({
    baseURL: "http://52.78.193.209:3000",
    withCredentials: true,
})

router.get("/manage", async(req,res,next)=>{
  try{
    const boardResponse = await request.get("/admin/users")
    console.log(boardResponse)
    res.render("user/management.html")
  }catch(e){
    next(e)
  }
})

// 사용자 정보 관리
router.get("/users", async (req,res,next) => {
  try{

  }catch(e){
    next(e)
  }
})

// 유자 선택시 세부정보 가져오기
router.get("/users/:id", async (req,res,next) => {  
  try{
    
  }catch(e){
    next(e)
  }
})

// 유저 정보 업데이트
router.put("/users/:id", async (req,res,next) => {
  try{
    
  }catch(e){
    next(e)
  }
})

// Category 관리
// 카테고리 가져오기
router.get("/categories", async (req,res,next) => {
  try{
    
  }catch(e){
    next(e)
  }
})
// 새로운 카테고리 만들기
router.post("/categories", async (req,res,next) => {  
  try{
    
  }catch(e){
    next(e)
  }
})

// 카테고리 수정하기
router.put("/categories/:id", async (req,res,next) => {
  try{
    
  }catch(e){
    next(e)
  }
})

// 카테고리 삭제하기
router.delete("/categories/:id", async (req,res,next) => {
  try{
    
  }catch(e){
    next(e)
  }
})

// 게시판 관리
// 게시판 정보 가져오기(공지/qna/자유게시판)
router.get("/boards", async (req,res,next) => {
  try{
    
  }catch(e){
    next(e)
  }
})

// 게시판 선택시 게시물 가져오기
router.get("/boards/:id", async (req,res,next) => {
  try{
    
  }catch(e){
    next(e)
  }
})

// 게시판 수정하기
router.put("/boards/:id", async (req,res,next) => {
  try{
    
  }catch(e){
    next(e)
  }
})

// 게시물 삭제
router.delete("/boards/:id", async (req,res,next) => {
  try{
    
  }catch(e){
    next(e)
  }
})

// Statistics
// 통계정보 가져오기
router.get("/stats", async (req,res,next) => {
  try{
    
  }catch(e){
    next(e)
  }
})

module.exports = router;
