# Generated by Django 4.2.2 on 2023-07-08 18:37

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        (
            "rest_api",
            "0008_pharmacymodel_remove_prescriptionmodel_pharmacy_name_and_more",
        ),
    ]

    operations = [
        migrations.RemoveField(
            model_name="prescriptionmodel",
            name="prescription_name",
        ),
        migrations.CreateModel(
            name="PrescriptionLineItemModel",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("name", models.CharField(max_length=1000)),
                ("quantiy", models.IntegerField()),
                ("created_at", models.DateTimeField(auto_now_add=True)),
                ("updated_at", models.DateTimeField(auto_now=True)),
                (
                    "request",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        to="rest_api.prescriptionmodel",
                    ),
                ),
            ],
        ),
    ]
