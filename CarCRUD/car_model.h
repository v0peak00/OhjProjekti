#ifndef CAR_MODEL_H
#define CAR_MODEL_H

class car_model : public QSqlQueryModel {
public:
    enum {
        CarIdRole = Qt::UserRole + 1,
        BranchRole,
        ModelRole
    };

    explicit car_model(QObject* parent = nullptr);
    void refresh();

protected:
    QHash<int, QByteArray> roleNames() const override;

private:
    void generateRoleNames();

};
#endif // CAR_MODEL_H
