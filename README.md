## Hello World!


<!-- from django.db import models

class User(models.Model):
    wallet_id = models.CharField(max_length=50)
    ban_status = models.BooleanField(default=False)

    def __str__(self):
        return self.wallet_id

class ProjectSecuredByChoices(models.TextChoices):
    TREASURY_BILL = 'TREASURY_BILL', 'Treasury Bill'
    INSURANCE = 'INSURANCE', 'Insurance'
    REAL_ESTATE = 'REAL_ESTATE', 'Real Estate'

class ProjectLoanTermChoices(models.TextChoices):
    ONE_MONTH = 'ONE_MONTH', '1 Month'
    TWO_MONTHS = 'TWO_MONTHS', '2 Months'
    SIX_MONTHS = 'SIX_MONTHS', '6 Months'

class ProjectCreditRatingChoices(models.TextChoices):
    A = 'A', 'A'
    A_PLUS = 'A+', 'A+'
    C = 'C', 'C'

class ProjectStatusChoices(models.TextChoices):
    UPCOMING = 'UPCOMING', 'Upcoming'
    MAKER_POOL = 'MAKER_POOL', 'Maker Pool'
    OPEN = 'OPEN', 'Open'
    CLOSED = 'CLOSED', 'Closed'
    FAILED = 'FAILED', 'Failed'

class Project(models.Model):
    name = models.CharField(max_length=255)
    smart_contract_url = models.CharField(max_length=255)
    description = models.TextField(max_length=500)
    apr = models.TextField(max_length=500)
    secured_by = models.CharField(
        max_length=20,
        choices=ProjectSecuredByChoices.choices,
        default=ProjectSecuredByChoices.TREASURY_BILL
    )
    loan_term = models.CharField(
        max_length=20,
        choices=ProjectLoanTermChoices.choices,
        default=ProjectLoanTermChoices.ONE_MONTH
    )
    origination_date = models.DateField()
    fundrise_end_time = models.DateTimeField()
    maturity_date = models.DateField()
    credit_rating = models.CharField(
        max_length=20,
        choices=ProjectCreditRatingChoices.choices,
        default=ProjectCreditRatingChoices.A
    )
    status = models.CharField(
        max_length=20,
        choices=ProjectStatusChoices.choices,
        default=ProjectStatusChoices.UPCOMING
    )
    issuer_picture = models.TextField(max_length=500)
    issuer_description = models.TextField(max_length=500)

    def __str__(self):
        return self.name

class InvestmentStatusChoices(models.TextChoices):
    ONGOING = 'ONGOING', 'Ongoing'
    REPAID = 'REPAID', 'Repaid'
    DEFAULT = 'DEFAULT', 'Default'

class Investment(models.Model):
    name = models.CharField(max_length=255)
    project = models.ForeignKey('Project', on_delete=models.CASCADE)
    user = models.ForeignKey('User', on_delete=models.CASCADE)
    amount = models.DecimalField(max_digits=20, decimal_places=8)
    status = models.CharField(
        max_length=20,
        choices=InvestmentStatusChoices.choices,
        default=InvestmentStatusChoices.DEFAULT
    )

    def __str__(self):
        return self.name -->


## MONGO
uname: galihlarasprakoso
pass: GF6GEvVsgoJ0mhAp