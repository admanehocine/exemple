pipeline {
    agent {
        docker {
            image 'cypress/browsers-internal:node22.15.1-bullseye-chrome136-ff138-edge'
            args '--entrypoint=""'
            //image 'cypress/browsers:node-24.11.1-chrome-142.0.7444.162-1-ff-145.0-edge-142.0.3595.65-1'
        }
    }

    stages {
        stage('verifiy dependance') {
            steps {
                
                sh 'node -v && npm -v'
            }
        }
        stage('Install dependencies') {
            steps {
                
                sh 'npm install'
            }
        }

        stage('Run tests') {
            steps {
                sh './cypress/e2e/batchs/login.sh'
            }
        }
    }
}