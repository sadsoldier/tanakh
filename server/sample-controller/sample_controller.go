/*
 * Copyright 2019 Oleg Borodin  <borodin@unix7.org>
 */


package sampleController

import (
    "net/http"
    "fmt"
    "errors"
    "log"

    "github.com/gin-gonic/gin"
    "github.com/jmoiron/sqlx"

    "master/config"
    "master/server/sample-model"
)

type Controller struct {
    config      *config.Config
    db          *sqlx.DB
    sample      *sampleModel.Model
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

func (this *Controller) GetRegions(context *gin.Context) {
    result, err := this.sample.GetRegions()
    if err != nil {
        sendError(context, err)
        return
    }
    sendResult(context, result)
}

func (this *Controller) GetSamples(context *gin.Context) {
   var request sampleModel.Request
    _ = context.Bind(&request)
    result, err := this.sample.GetSamples(&request)
    if err != nil {
        sendError(context, err)
        return
    }
    sendResult(context, result)
}

func New(config *config.Config, db *sqlx.DB) *Controller {
    return &Controller{
        config: config,                 // Referense to conguration store
        db:     db,                     // Referense to sqlx database driver
        sample: sampleModel.New(db),    // Model instance `ready for use`
    }
}
