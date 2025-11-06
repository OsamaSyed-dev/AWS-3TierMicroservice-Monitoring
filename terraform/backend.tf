# -----------------------
# Backend Configuration
# -----------------------

terraform {
  required_version = ">= 1.3.0"

  backend "remote" {
    hostname     = "app.terraform.io"
    organization = "Portfolio-Projects"

    workspaces {
      name = "AWS-Microservices-Project"
    }
  }
}
