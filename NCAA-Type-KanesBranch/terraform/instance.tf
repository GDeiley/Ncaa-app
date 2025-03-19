# Requirements:

#     Create a VPC with a CIDR block (e.g., 10.0.0.0/16).
#     Create a public subnet within the VPC (e.g., 10.0.1.0/24).
#     Add an Internet Gateway and attach it to the VPC.
#     Create a route table and a route to the Internet Gatesway.
# updatessdfsasdas

terraform {
    required_providers {
        aws = {
            source  = "hashicorp/aws"
            version = "~> 3.0"
        }
    }
}
    provider "aws" {
        region = "us-east-1"
    }

resource "aws_vpc" "new_vpc" {
    cidr_block = "10.0.0.0/16"

    tags = {
        Name = "new_vpc"
    }
}
resource "aws_subnet" "new_subnet" {
    vpc_id = aws_vpc.new_vpc.id
    cidr_block = "10.0.1.0/24"
    map_public_ip_on_launch = "true"

    tags = {
        Name = "new_subnet"
    }
}

resource "aws_internet_gateway" "new_internet_gateway" {
    vpc_id = aws_vpc.new_vpc.id

    tags = {
        Name = "new_internet_gateway"
    }

}

resource "aws_route_table" "new_route_table" {
    vpc_id = aws_vpc.new_vpc.id

    route {
        cidr_block = "0.0.0.0/0"
        gateway_id = aws_internet_gateway.new_internet_gateway.id
    }
    
    tags = {
        Name = "new_route_table"
    }
    
}

resource "aws_route_table_association" "new_route_table_association" {
    route_table_id = aws_route_table.new_route_table.id
    subnet_id = aws_subnet.new_subnet.id
}


resource "aws_security_group" "terraform_security_group" {
name = "terraform_security_group"
    description = "allow ssh connection"
    vpc_id = aws_vpc.new_vpc.id

    ingress {
        from_port = 22
        to_port = 22
        protocol = "tcp"
        cidr_blocks = ["0.0.0.0/0"]
    }

    egress {
        from_port = 0
        to_port = 0
        protocol = "-1"
        cidr_blocks = ["0.0.0.0/0"]
    }

    tags = {
        Name = "terraform_security_group"
    }
}

variable "ssh_key" {
  description = "SSH key to add to the instance"
  type        = string
}


 
resource "aws_instance" "new_instance" {
    ami           = "ami-011899242bb902164"  # Ensure this AMI ID is valid for the region and is a suitable base image
    instance_type = "t2.micro"
    subnet_id = aws_subnet.new_subnet.id
    vpc_security_group_ids = [aws_security_group.terraform_security_group.id]

    user_data = <<-EOF
              #!/bin/bash
               echo "${var.ssh_key}" >> /home/ubuntu/.ssh/authorized_keys
              EOF

    tags = {
        Name = "new_instance"
    }
}

output "ssh_connect_line" {
  value = "ssh -i id_rsa ubuntu@${aws_instance.new_instance.public_ip}"
} 
//test