pipeline {
    agent any

    environment {
        DOCKER_IMAGE = 'markhobson/maven-chrome'
        GITHUB_REPO = 'https://github.com/fasiiha/ecom.git'
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: env.GITHUB_REPO
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    docker.build(DOCKER_IMAGE, '-f selenium/Dockerfile .')
                }
            }
        }

        stage('Run Tests') {
            steps {
                script {
                    docker.image(DOCKER_IMAGE).inside {
                        sh '''
                            cd selenium
                            npm install
                            npm test
                        '''
                    }
                }
            }
        }
    }

    post {
        always {
            sh 'docker system prune -f'
            archiveArtifacts artifacts: 'selenium/screenshots/**/*', allowEmptyArchive: true
        }
    }
}