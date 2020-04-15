/*
 * Copyright 2019 Oleg Borodin  <borodin@unix7.org>
 */


package userController

import (
    "net/http"
    "fmt"
    "errors"
    "log"

    "github.com/gin-contrib/sessions"
    "github.com/gin-gonic/gin"
    "github.com/jmoiron/sqlx"

    "master/config"
    "master/server/user-model"
)

type Controller struct {
    config  *config.Config
    db      *sqlx.DB
    user    *userModel.Model
}

type Response struct {
    Error       bool        `json:"error"`
    Message     string      `json:"message,omitempty"`
    Result      interface{} `json:"result,omitempty"`
}

func sendError(context *gin.Context, err error) {
    if err == nil {
        err = errors.New("undefined")
    }
    log.Printf("%s\n", err)
    response := Response{
        Error: true,
        Message: fmt.Sprintf("%s", err),
        Result: nil,
    }
    context.JSON(http.StatusOK, response)
}

func sendOk(context *gin.Context) {
    response := Response{
        Error: false,
        Message: "",
        Result: nil,
    }
    context.JSON(http.StatusOK, response)
}

func sendMessage(context *gin.Context, message string) {
    log.Printf("%s\n", message)
    response := Response{
        Error: false,
        Message: fmt.Sprintf("%s", message),
        Result: nil,
    }
    context.JSON(http.StatusOK, response)
}

func sendResult(context *gin.Context, result interface{}) {
    response := Response{
        Error: false,
        Message: "",
        Result: result,
    }
    context.JSON(http.StatusOK, &response)
}

func (this *Controller) List(context *gin.Context) {
    var listRequest userModel.ListRequest
    _ = context.Bind(&listRequest)
    listResponse, err :=  this.user.List(&listRequest)
    if err != nil {
        sendError(context, err)
        return
    }
    sendResult(context, &listResponse)
}

func (this *Controller) Create(context *gin.Context) {
    var user userModel.User
    var err error
    err = context.Bind(&user)
    if err != nil {
        sendError(context, err)
        return
    }

    err = this.user.Create(user)
    if err != nil {
        sendError(context, err)
        return
    }
    sendOk(context)

    /* Verificarion */

    //var out userModel.User
    //out, err = this.user.Find(user)
    //if err != nil {
    //    return sendError(context, err)
    //}
    //var list []userModel.User
    //list = append(list, out)
    //return sendResult(context, &list)
}

func (this *Controller) Update(context *gin.Context) {
    var user userModel.User
    var err error
    err = context.Bind(&user)
    if err != nil {
        sendError(context, err)
        return
    }

    err = this.user.Update(user)
    if err != nil {
        sendError(context, err)
        return
    }
    sendOk(context)
}

func (this *Controller) Delete(context *gin.Context) {
    var user userModel.User
    var err error
    err = context.Bind(&user)
    if err != nil {
        sendError(context, err)
        return
    }

    err = this.user.Delete(user)
    if err != nil {
        sendError(context, err)
        return
    }
    sendOk(context)
}

func (this *Controller) Login(context *gin.Context) {
    var user userModel.User
    var err error
    err = context.Bind(&user)
    if err != nil {
        sendError(context, err)
        return
    }

    err = this.user.Check(&user)
    if err != nil {
        sendError(context, err)
        return
    }

    session := sessions.Default(context)
    session.Set("username", user.Username)
    session.Save()

    sendResult(context, &user)
}

func (this *Controller) Logout(context *gin.Context) {
    var user userModel.User
    var err error
    err = context.Bind(&user)
    if err != nil {
        sendError(context, err)
        return
    }
    session := sessions.Default(context)
    session.Set("username", "")
    session.Save()

    sendOk(context)
}

func New(config *config.Config, db *sqlx.DB) *Controller {
    return &Controller{
        config: config,
        db: db,
        user: userModel.New(db),
    }
}
