#ifndef MAINWINDOW_H
#define MAINWINDOW_H

#include <QMainWindow>
#include <QtNetwork>
#include <QNetworkAccessManager>
#include <QJsonDocument>
#include "ui_mainwindow.h"

QT_BEGIN_NAMESPACE
namespace Ui { class MainWindow; }
QT_END_NAMESPACE

class MainWindow : public QMainWindow
{
    Q_OBJECT

public:
    MainWindow(QWidget *parent = nullptr);
    ~MainWindow();

private slots:
    void on_pushButtonView_clicked()
    {
        QString id = ui->lineEditId->text().trimmed(); // Trim whitespace from input

        if (id.isEmpty()) {
            // Fetch all cars
            QString site_url = "http://localhost:3000/car";
            QNetworkRequest request(site_url);
            getManager = new QNetworkAccessManager(this);
            connect(getManager, SIGNAL(finished(QNetworkReply*)), this, SLOT(getCarSlot(QNetworkReply*)));
            reply = getManager->get(request);
        } else if (id.toInt() > 0) {
            // Fetch car by ID
            QString site_url = "http://localhost:3000/car/" + id;
            QNetworkRequest request(site_url);
            getManager = new QNetworkAccessManager(this);
            connect(getManager, SIGNAL(finished(QNetworkReply*)), this, SLOT(getCarSlot(QNetworkReply*)));
            reply = getManager->get(request);
        } else {
            // Display error message if input is not valid
            ui->textEditCar->setText("Invalid ID input");
        }
    }


    void on_pushButtonAdd_clicked()
    {
        QString site_url = "http://localhost:3000/car";
        QNetworkRequest request(site_url);
        request.setHeader(QNetworkRequest::ContentTypeHeader, "application/json");

        // Get data from text edits
        QString branch = ui->lineEditBranch->text();
        QString model = ui->lineEditModel->text();

        // Create JSON object from data
        QJsonObject json;
        json.insert("branch", branch);
        json.insert("model", model);

        postManager = new QNetworkAccessManager(this);
        connect(postManager, SIGNAL(finished(QNetworkReply*)), this, SLOT(addCarSlot(QNetworkReply*)));

        reply = postManager->post(request, QJsonDocument(json).toJson());
    }

    void on_pushButtonUpdate_clicked()
    {
        QString id = ui->lineEditId->text();
        if (id.isEmpty()) {
            // If ID field is empty, display error message and return
            ui->textEditCar->setText("Please enter a car ID");
            return;
        }

        QString site_url = "http://localhost:3000/car/" + id;

        QJsonObject car_obj;
        car_obj.insert("branch", ui->lineEditBranch->text());
        car_obj.insert("model", ui->lineEditModel->text());

        QJsonDocument car_doc(car_obj);
        QByteArray car_data = car_doc.toJson();

        QNetworkRequest request(site_url);
        request.setHeader(QNetworkRequest::ContentTypeHeader, "application/json");

        putManager = new QNetworkAccessManager(this);
        connect(putManager, SIGNAL(finished(QNetworkReply*)), this, SLOT(updateCarSlot(QNetworkReply*)));

        reply = putManager->put(request, car_data);

        ui->textEditCar->setText("Updating car...");
    }

    void on_pushButtonDelete_clicked()
    {
        QString car_id = ui->lineEditId->text();

        if (car_id.isEmpty()) {
            // If car ID is not given, show an error message
            ui->textEditCar->setText("Please enter a car ID to delete");
            return;
        }

        QString site_url = "http://localhost:3000/car/" + car_id;
        QNetworkRequest request(site_url);
        deleteManager = new QNetworkAccessManager(this);

        connect(deleteManager, SIGNAL(finished(QNetworkReply*)), this, SLOT(deleteCarSlot(QNetworkReply*)));

        reply = deleteManager->deleteResource(request);
    }


    void getCarSlot (QNetworkReply *reply);

    void addCarSlot (QNetworkReply *reply);

    void updateCarSlot (QNetworkReply *reply);

    void deleteCarSlot (QNetworkReply *reply);



private:
    Ui::MainWindow *ui;
    QNetworkAccessManager *getManager;
    QNetworkAccessManager *postManager;
    QNetworkAccessManager *putManager;
    QNetworkAccessManager *deleteManager;
    QNetworkReply *reply;
    QByteArray response_data;
};
#endif // MAINWINDOW_H
