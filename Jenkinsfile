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
                    bat "docker build -t ${DOCKER_IMAGE} -f selenium/Dockerfile ."
                }
            }
        }

        stage('Run Tests') {
            steps {
                script {
                     bat """
                        docker run --rm ${DOCKER_IMAGE} cmd /c "cd selenium && npm install && npm test"
                    """
                }
            }
        }
    }

    post {
        always {
            bat 'docker system prune -f'
            archiveArtifacts artifacts: 'selenium/screenshots/**/*', allowEmptyArchive: true
        }
    }
}