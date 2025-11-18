pipeline {
    agent {
        docker {
            image 'cypress/browsers:latest'
            args '--user=root --entrypoint='
        }
    }

    environment {
        CYPRESS_INSTALL_BINARY = "0"
    }

    stages {

        stage('Verify dependencies') {
            steps {
                sh 'node -v && npm -v'
            }
        }

        stage('Install dependencies') {
            steps {
                sh 'npm install'   // <---- remplacé !
                sh 'npx cypress'
            }
        }

        stage('Run tests') {
            steps {
                sh 'npx cypress run'
            }
        }
    }
}
