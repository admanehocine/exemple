pipeline {
    agent {
        docker {
            image 'cypress/included:15.6.0'
            args '--user node'
        }
    }

    stages {
        stage('Run Cypress') {
            steps {
                sh 'npx cypress run'
            }
        }
    }

    post {
        always {
            junit 'results/*.xml'
        }
    }
}
