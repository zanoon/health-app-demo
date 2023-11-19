# Generated by Django 4.2.2 on 2023-07-10 08:50

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ("rest_api", "0012_appointmentstatelogmodel"),
    ]

    operations = [
        migrations.CreateModel(
            name="PrescriptionStateLogModel",
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
                ("from_state", models.CharField(max_length=100)),
                ("to_state", models.CharField(max_length=100)),
                ("created_at", models.DateTimeField(auto_now_add=True)),
                (
                    "prescription",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        to="rest_api.prescriptionmodel",
                    ),
                ),
                (
                    "triggered_by",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.DO_NOTHING,
                        related_name="%(app_label)s_%(class)s_trigger_by_related",
                        related_query_name="%(app_label)s_%(class)s_trigger_by",
                        to=settings.AUTH_USER_MODEL,
                    ),
                ),
            ],
            options={
                "abstract": False,
            },
        ),
    ]
