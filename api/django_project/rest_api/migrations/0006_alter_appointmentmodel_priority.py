# Generated by Django 4.2.2 on 2023-07-01 08:26

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        (
            "rest_api",
            "0005_alter_patientmodel_city_alter_patientmodel_country_and_more",
        ),
    ]

    operations = [
        migrations.AlterField(
            model_name="appointmentmodel",
            name="priority",
            field=models.PositiveIntegerField(null=True),
        ),
    ]
