pipeline {
    agent any

    environment {
        DOCKER_IMAGE = 'markhobson/maven-chrome:latest'
        GITHUB_REPO = 'https://github.com/fasiiha/ecom.git'
    }

    stages {
        stage('Checkout') {
            steps {
               checkout([
                    $class: 'GitSCM',
                    branches: [[name: '*/master']],
                    extensions: [[$class: 'CleanBeforeCheckout']],
                    userRemoteConfigs: [[url: env.GITHUB_REPO]]
                ])
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    bat "docker build ${DOCKER_IMAGE}"
                }
            }
        }

        stage('Run Tests') {
            steps {
                script {
                    bat """
                docker run --rm \
                -v %CD%:/workspace \
                -w /workspace/selenium \
                ${DOCKER_IMAGE} \
                sh -c "npm install && npm test"
            """
                }
            }
        }
    }

    post {
        always {
            bat 'docker system prune -f'
            archiveArtifacts artifacts: 'selenium/screenshots/**/*', allowEmptyArchive: true
            junit '**/target/surefire-reports/*.xml'
        }
    }
}