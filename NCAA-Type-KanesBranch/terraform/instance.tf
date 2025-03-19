# Requirements:

#     Create a VPC with a CIDR block (e.g., 10.0.0.0/16).
#     Create a public subnet within the VPC (e.g., 10.0.1.0/24).
#     Add an Internet Gateway and attach it to the VPC.
#     Create a route table and a route to the Internet Gateway.
# updates

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
    

 
resource "aws_instance" "new_instance" {
    ami           = "ami-011899242bb902164"  # Ensure this AMI ID is valid for the region and is a suitable base image
    instance_type = "t2.micro"
    subnet_id = aws_subnet.new_subnet.id
    vpc_security_group_ids = [aws_security_group.terraform_security_group.id]

    user_data = <<-EOF
              #!/bin/bash
              echo "ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAACAQCvTPVuWj8kzsdSF6Giew2zDU3raAnaUd73b0UwelqVsYC9QF3LKzRei6u99bLbvV7wbAcf9Tbt+7khY8Hm9wkIxB5b2C/vHGR+E+lQzSxyfjD4Azrdwx1E+8h3LVUo+UentLh08L3Prr+MlsmrpkvP2DwpmsB7sT/+czXs/4HQPQA34jEyOz1CRvv9DDxxyuHzME9hwt5o4sjHs6QTNiVCSLXWI2SqW8RoL9N6I0/414vsFk0HyGKqj+MwnD0Z+Z0HhHQn5KCsT+qrgNMvZUR5uh5LP2s3GuBD/d4z3EHvZO9q9BlG9x4y38yfBC7YyAtjRi2HodLRFXjhppo4bkGoCSHcRG5V2MtuhI2t7LQ/u/H236qi0ZTADZrOzNISIYNJF/yagQlJMnVzifun4K4nWmh9rMdjKI1nrRULaHEbefemCoEqGeve+VnxACt/uvxQ2QFNCj5PuAe9YthE/pkzgHiDAPH+CcOb+Ginj/DPUkutIpXt0FtAPm4IYPJcZ+eOE5vsoUiPZ7mP6l7s6raebXaIEICYvo3g0BpNHotGP41Uit7oui61cHh9IbSbunpsGy12tJNISQ4ykgsVO3k7ypsDvaiaD8HbXN5Ok2PDxMJSXyA95vpCf6wccUv9+7CELghBEP2XuqEyFnlK0fRFRdkuaNR0jeA6ycqJStkgFw== graysondeiley@Graysons-Laptop.local" >> /home/ubuntu/.ssh/authorized_keys
              EOF

    tags = {
        Name = "new_instance"
    }
}

output "ssh_connect_line" {
  value = "ssh -i id_rsa ubuntu@${aws_instance.new_instance.public_ip}"
} 


//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