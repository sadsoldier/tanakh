/*
 * Copyright 2019 Oleg Borodin  <borodin@unix7.org>
 */

package main

import (
    "master/server"
)

func main() {
    server := server.New()
    server.Start()
}
