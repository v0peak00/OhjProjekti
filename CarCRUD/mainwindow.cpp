#include "mainwindow.h"
#include "ui_mainwindow.h"

MainWindow::MainWindow(QWidget *parent)
    : QMainWindow(parent)
    , ui(new Ui::MainWindow)
{
    ui->setupUi(this);
}

MainWindow::~MainWindow()
{
    delete ui;
}

void MainWindow::getCarSlot(QNetworkReply *reply)
{
    response_data = reply->readAll();
    qDebug() << "DATA : " + response_data;

    QJsonDocument json_doc = QJsonDocument::fromJson(response_data);

    if (json_doc.isObject()) {
        // Response contains a single car object
        QJsonObject json_obj = json_doc.object();
        QString car = QString::number(json_obj["car_id"].toInt()) + ", " + json_obj["branch"].toString() + ", " + json_obj["model"].toString();
        ui->textEditCar->setText(car);
    } else if (json_doc.isArray()) {
        // Response contains an array of car objects
        QJsonArray json_array = json_doc.array();
        QString car;
        foreach (const QJsonValue &value, json_array) {
            QJsonObject json_obj = value.toObject();
            car += QString::number(json_obj["car_id"].toInt()) + ", " + json_obj["branch"].toString() + ", " + json_obj["model"].toString() + "\r";
        }
        ui->textEditCar->setText(car);
    } else {
        // Response is not valid JSON
        ui->textEditCar->setText("Error fetching Car data");
    }

    reply->deleteLater();
    getManager->deleteLater();
}


void MainWindow::addCarSlot(QNetworkReply *reply)
{
    response_data=reply->readAll();
    int status_code = reply->attribute(QNetworkRequest::HttpStatusCodeAttribute).toInt();

    if (status_code == 200 || status_code == 201) { // Success status codes
        ui->textEditCar->setText("Car added successfully!");
        ui->lineEditBranch->setText("");
        ui->lineEditModel->setText("");
    } else {
        ui->textEditCar->setText("Error: " + QString::number(status_code));
    }

    reply->deleteLater();
    postManager->deleteLater();
}

void MainWindow::updateCarSlot(QNetworkReply *reply)
{
    QByteArray response_data = reply->readAll();
    int http_status_code = reply->attribute(QNetworkRequest::HttpStatusCodeAttribute).toInt();

    if (http_status_code == 200 || http_status_code == 204) {
        // If HTTP status code is 200 or 204, update was successful
        ui->textEditCar->setText("Car updated successfully");
        ui->lineEditId->setText("");
        ui->lineEditBranch->setText("");
        ui->lineEditModel->setText("");
    } else {
        // If HTTP status code is not 200 or 204, update failed
        ui->textEditCar->setText("Failed to update car");
    }

    reply->deleteLater();
    putManager->deleteLater();
}

void MainWindow::deleteCarSlot(QNetworkReply *reply)
{
    int statusCode = reply->attribute(QNetworkRequest::HttpStatusCodeAttribute).toInt();

    if (statusCode == 200) {
        // If the status code is 204 (No Content), the car was successfully deleted
        ui->textEditCar->setText("Car deleted successfully");
        ui->lineEditId->setText("");
    } else if (statusCode == 404) {
        // If the status code is 404 (Not Found), the car was not found
        ui->textEditCar->setText("Car not found");
    } else {
        // Otherwise, there was an error
        ui->textEditCar->setText("Error deleting car");
    }

    reply->deleteLater();
    deleteManager->deleteLater();
}



