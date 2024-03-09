pipeline {
    agent any

    tools {
        nodejs "node"
    }
    
    environment {
        IMAGE_NAME = '64070171/custom-nginx-registry:latest'
        DOCKER_CREDENTIALS = credentials('dockerhub')
        DOCKER_IMAGE = ''
    }
    
    stages {
        
        stage("Install Dependencies") {
            steps {
                sh "npm install"
            }
        }
        
        stage('Start Jenkins') {
            steps {
                // Checkout your source code from version control
             
                    sh 'echo Start Jenkins............'
                    sh 'echo docker : user = $DOCKER_CREDENTIALS_USR : password = $DOCKER_CREDENTIALS_PSW'
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    DOCKER_IMAGE = docker.build IMAGE_NAME
                } 
                  
            }
        }
        
        stage('Deploy Image') {
            steps {
                script {
                    docker.withRegistry("https://registry.hub.docker.com", 'dockerhub-creds') {
                        DOCKER_IMAGE.push("${env.BUILD_NUMBER}")
                    }
                }
            }
        }
    }
    
    post {
        always {
            // Logout from Docker Hub
            sh 'docker logout'
        }
    }
}