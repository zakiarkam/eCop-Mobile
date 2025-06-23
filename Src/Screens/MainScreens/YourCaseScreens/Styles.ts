import {StyleSheet, Dimensions} from 'react-native';
import {Colors} from '../../../Styles/colors';

const {width} = Dimensions.get('window');
const buttonWidth = (width - 90) / 2;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary,
  },
  header: {
    paddingTop: '25%',
    paddingBottom: 10,
    paddingHorizontal: 30,
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: Colors.white,
  },
  formContainer: {
    flex: 1,
    backgroundColor: Colors.white,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 30,
    paddingTop: 40,
  },
  subtitle: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'Poppins',
    color: Colors.blue,
    textAlign: 'center',
    marginBottom: 10,
  },

  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: Colors.lightGray,
    textAlign: 'center',
    marginBottom: 30,
  },
  scrollContainer: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 100,
  },

  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#666',
  },

  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#666',
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
    paddingHorizontal: 20,
    lineHeight: 20,
  },

  violationCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 20,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
    borderLeftWidth: 4,
    borderLeftColor: Colors.primary,
    position: 'relative',
  },
  violationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  violationDateContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  violationDate: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  violationContent: {
    flex: 1,
  },
  violationAct: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
    lineHeight: 22,
  },
  violationDetails: {
    marginBottom: 15,
  },
  violationDetailItem: {
    flexDirection: 'row',
    marginBottom: 6,
  },
  detailLabel: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
    width: 70,
  },
  detailValue: {
    fontSize: 14,
    color: '#333',
    fontWeight: '600',
    flex: 1,
  },
  violationFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  fineContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  fineLabel: {
    fontSize: 14,
    color: '#666',
    marginRight: 8,
  },
  fineAmount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.red,
  },
  pointsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  pointsLabel: {
    fontSize: 14,
    color: '#666',
    marginRight: 8,
  },
  pointsValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#F39C12',
  },
  cardArrow: {
    position: 'absolute',
    right: 20,
    top: '50%',
    marginTop: -12,
  },
  arrowText: {
    fontSize: 24,
    color: '#CCC',
    fontWeight: '300',
  },

  // Detail Screen Styles
  detailsContainer: {
    flex: 1,
    backgroundColor: Colors.primary,
  },
  detailsHeader: {
    paddingTop: '10%',
    paddingBottom: 20,
    paddingHorizontal: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  actTitle: {
    flex: 1,
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.white,
    textAlign: 'center',
  },
  detailsContent: {
    flex: 1,
    backgroundColor: Colors.white,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingTop: 30,
  },
  statusSection: {
    alignItems: 'center',
    marginBottom: 25,
  },
  statusBadgeLarge: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
  statusTextLarge: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFFFFF',
    letterSpacing: 1,
  },
  detailSection: {
    marginBottom: 25,
  },
  sectionHeaderText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  detailCard: {
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    padding: 18,
    borderLeftWidth: 4,
    borderLeftColor: Colors.primary,
  },
  violationActDetail: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 15,
    lineHeight: 24,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  detailLabelLarge: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
    width: 120,
  },
  detailValueLarge: {
    fontSize: 14,
    color: '#333',
    fontWeight: '600',
    flex: 1,
    textAlign: 'right',
  },
  detailValueSmall: {
    fontSize: 12,
    color: '#333',
    fontWeight: '600',
    flex: 1,
    textAlign: 'right',
  },
  contactLink: {
    color: Colors.primary,
    textDecorationLine: 'underline',
  },

  // Penalty Section
  penaltyContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 15,
  },
  penaltyCard: {
    flex: 1,
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#E9ECEF',
  },
  penaltyLabel: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
    marginBottom: 8,
    textAlign: 'center',
  },
  penaltyValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#E74C3C',
    textAlign: 'center',
  },

  notesText: {
    fontSize: 14,
    color: '#333',
    lineHeight: 22,
    fontStyle: 'italic',
  },

  actGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 20,
  },
  actButton: {
    width: buttonWidth,
    height: 80,
    backgroundColor: Colors.lightBlue,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  actButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
  },
  actCount: {
    fontSize: 12,
    color: '#E6F3FF',
    marginTop: 4,
  },
  ruleCard: {
    backgroundColor: '#F8F9FA',
    borderRadius: 15,
    padding: 20,
    marginBottom: 15,
    borderLeftWidth: 4,
    borderLeftColor: Colors.primary,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  ruleProvision: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 10,
    lineHeight: 22,
  },
  ruleDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  ruleInfo: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  ruleFine: {
    fontSize: 14,
    color: '#E74C3C',
    fontWeight: '600',
    marginBottom: 4,
  },
  rulePoints: {
    fontSize: 14,
    color: '#F39C12',
    fontWeight: '500',
  },
  ruleBadge: {
    backgroundColor: '#4A90E2',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
    alignItems: 'center',
  },
  ruleBadgeText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  noRulesContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 60,
  },
  noRulesText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#666',
    marginBottom: 8,
  },
  noRulesSubtext: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
    paddingHorizontal: 20,
    lineHeight: 20,
  },
});

export default styles;
