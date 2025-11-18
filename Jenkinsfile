pipeline {
    agent {
        docker {
            image 'cypress/included:13.6.6'
            args '--entrypoint=""'
        }
    }

    stages {

        stage('Run cypress') {
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
