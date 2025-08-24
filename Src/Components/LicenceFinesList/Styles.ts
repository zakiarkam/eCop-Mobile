import {StyleSheet} from 'react-native';
import {Colors} from '../../Styles/colors';

const styles = StyleSheet.create({
  fineContentContainer: {
    flex: 1,
    padding: 16,
  },
  fineSummaryCard: {
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    alignItems: 'center',
    borderLeftWidth: 4,
    borderLeftColor: Colors.primary,
  },
  fineSummaryTitle: {
    fontSize: 16,
    color: Colors.lightBlue,
    marginBottom: 8,
  },
  fineSummaryAmount: {
    fontSize: 28,
    fontWeight: 'bold',
    color: Colors.red,
    marginBottom: 4,
  },
  fineSummarySubtext: {
    fontSize: 14,
    color: Colors.lightBlue,
  },
  fineScrollContainer: {
    flex: 1,
  },
  fineScrollContent: {
    paddingBottom: 20,
  },
  violationCard: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
    borderWidth: 1,
    borderColor: '#f0f0f0',
  },
  violationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  violationDate: {
    fontSize: 14,
    color: Colors.lightBlue,
    fontWeight: '500',
  },
  activeBadge: {
    backgroundColor: Colors.red,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  activeText: {
    color: Colors.white,
    fontSize: 10,
    fontWeight: 'bold',
  },
  violationAct: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.primary,
    marginBottom: 12,
    lineHeight: 22,
  },
  violationDetails: {
    marginBottom: 16,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  detailLabel: {
    fontSize: 14,
    color: Colors.lightBlue,
    flex: 1,
  },
  detailValue: {
    fontSize: 14,
    color: Colors.primary,
    fontWeight: '500',
    flex: 2,
    textAlign: 'right',
  },
  paymentSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  fineContainer: {
    flex: 1,
  },
  fineLabel: {
    fontSize: 12,
    color: Colors.lightBlue,
    marginBottom: 4,
  },
  fineAmount: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.red,
  },
  payButton: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 3.84,
    elevation: 5,
  },
  payButtonText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 80,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.primary,
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    color: Colors.lightBlue,
    textAlign: 'center',
  },
});

export default styles;
